"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { apiFetch } from "@/lib/api";
import styles from "./AdminDashboard.module.css";

interface Provider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  speciality: string;
  rating: number;
  reviews: number;
  status: string;
  avatar: string;
}

interface RequestData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  vehicleType: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  location: string;
  landmark?: string;
  notes?: string;
  status: "received" | "matched" | "en-route" | "arrived" | "completed";
  assignedProvider: Provider | null;
  contacted: boolean;
  createdAt: string;
}

const serviceDetails: Record<string, string> = {
  towing: "🚛 Towing",
  battery: "🔋 Battery Jump",
  "flat-tire": "🔧 Flat Tire Change",
  fuel: "⛽ Fuel Delivery",
  lockout: "🔑 Lockout Service",
  repair: "🔩 Minor Repair",
};

export default function AdminPage() {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "active" | "completed">("all");
  const [loading, setLoading] = useState(true);

  // Fetch Requests
  const fetchRequests = useCallback(async (isPoll = false) => {
    try {
      const res = await apiFetch("/api/requests", { bustCache: isPoll });
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (err) {
      console.error("Error loading admin requests:", err);
    } finally {
      if (!isPoll) setLoading(false);
    }
  }, []);

  // Fetch Providers
  const fetchProviders = useCallback(async (isPoll = false) => {
    try {
      const res = await apiFetch("/api/providers", { bustCache: isPoll });
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      }
    } catch (err) {
      console.error("Error loading admin providers:", err);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    fetchProviders();

    // Poll requests list every 4 seconds to sync in real time
    const interval = setInterval(() => {
      fetchRequests(true);
      fetchProviders(true);
    }, 4000);

    return () => clearInterval(interval);
  }, [fetchRequests, fetchProviders]);

  // Selected request object
  const activeRequest = useMemo(() => {
    return requests.find((r) => r.id === selectedId) || null;
  }, [requests, selectedId]);

  // Stats Calculation
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "received").length;
    const active = requests.filter((r) => ["matched", "en-route", "arrived"].includes(r.status)).length;
    const completed = requests.filter((r) => r.status === "completed").length;
    return { total, pending, active, completed };
  }, [requests]);

  // Filtering Logic
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Tab filter
      if (filterTab === "pending" && req.status !== "received") return false;
      if (filterTab === "active" && !["matched", "en-route", "arrived"].includes(req.status)) return false;
      if (filterTab === "completed" && req.status !== "completed") return false;

      // Search query filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = req.name.toLowerCase().includes(query);
        const matchesId = req.id.toLowerCase().includes(query);
        const matchesLoc = req.location.toLowerCase().includes(query);
        const matchesService = (serviceDetails[req.service] || req.service).toLowerCase().includes(query);
        const matchesVehicle = [req.vehicleYear, req.vehicleMake, req.vehicleModel].filter(Boolean).join(" ").toLowerCase().includes(query);

        return matchesName || matchesId || matchesLoc || matchesService || matchesVehicle;
      }

      return true;
    });
  }, [requests, filterTab, search]);

  // Patch Request Helper
  const handleUpdateRequest = async (id: string, updates: Partial<RequestData>) => {
    try {
      const res = await apiFetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        const updated = await res.json();
        // Update requests state locally immediately
        setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
      }
    } catch (err) {
      console.error("Failed to patch request:", err);
    }
  };

  const handleDispatch = (request: RequestData, provider: Provider) => {
    handleUpdateRequest(request.id, {
      assignedProvider: {
        ...provider,
        status: "Dispatched",
      },
      status: "matched",
    });
  };

  const handleStatusChange = (request: RequestData, newStatus: RequestData["status"]) => {
    if (newStatus === "completed") return;
    handleUpdateRequest(request.id, { status: newStatus });
  };

  const formatTimeAgo = (dateStr: string) => {
    const time = new Date(dateStr).getTime();
    const diff = Date.now() - time;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <div className={styles.page}>
          <div className="container">
            {/* Header */}
            <div className={styles.header}>
              <div>
                <span className="badge badge-amber">Admin Dashboard</span>
                <h1 className={styles.title}>RoadRescue <span className="gradient-text">Operations</span></h1>
              </div>
            </div>

            {/* Metrics */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>📋</span>
                <div>
                  <p className={styles.statValue}>{stats.total}</p>
                  <p className={styles.statLabel}>Total Requests</p>
                </div>
              </div>
              <div className={styles.statCard} style={{ borderLeft: "3px solid var(--danger)" }}>
                <span className={styles.statIcon} style={{ background: "rgba(239, 68, 68, 0.1)" }}>⏳</span>
                <div>
                  <p className={styles.statValue} style={{ color: "var(--danger)" }}>{stats.pending}</p>
                  <p className={styles.statLabel}>Pending Dispatch</p>
                </div>
              </div>
              <div className={styles.statCard} style={{ borderLeft: "3px solid var(--amber)" }}>
                <span className={styles.statIcon} style={{ background: "rgba(245, 158, 11, 0.1)" }}>🚛</span>
                <div>
                  <p className={styles.statValue} style={{ color: "var(--amber)" }}>{stats.active}</p>
                  <p className={styles.statLabel}>Active Missions</p>
                </div>
              </div>
              <div className={styles.statCard} style={{ borderLeft: "3px solid var(--success)" }}>
                <span className={styles.statIcon} style={{ background: "rgba(34, 197, 94, 0.1)" }}>✅</span>
                <div>
                  <p className={styles.statValue} style={{ color: "var(--success)" }}>{stats.completed}</p>
                  <p className={styles.statLabel}>Completed</p>
                </div>
              </div>
            </div>

            {/* Work Grid */}
            <div className={styles.dashboardGrid}>
              
              {/* Left Column: Request List */}
              <div className={styles.listPanel}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelTitle}>
                    <span>Incoming Requests</span>
                    <span className={styles.liveIndicator}>
                      <span className={styles.liveDot} />
                      Live Feed
                    </span>
                  </div>
                  <div className={styles.searchBox}>
                    <input
                      type="text"
                      className={styles.searchField}
                      placeholder="Search name, ID, vehicle, location..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className={styles.filterTabs}>
                    {(["all", "pending", "active", "completed"] as const).map((tab) => (
                      <button
                        key={tab}
                        className={`${styles.filterTab} ${filterTab === tab ? styles.filterTabActive : ""}`}
                        onClick={() => setFilterTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.listItems}>
                  {loading ? (
                    <div style={{ textAlign: "center", padding: "3rem" }}>
                      <span className="dot-pulse"><span/><span/><span/></span>
                    </div>
                  ) : filteredRequests.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                      No assistance requests matching filter.
                    </div>
                  ) : (
                    filteredRequests.map((req) => {
                      const isActive = req.id === selectedId;
                      return (
                        <button
                          key={req.id}
                          className={`${styles.requestCard} ${isActive ? styles.requestCardActive : ""}`}
                          onClick={() => setSelectedId(req.id)}
                        >
                          <div className={styles.cardHeader}>
                            <span className={styles.clientName}>{req.name}</span>
                            <span className={styles.reqId}>{req.id}</span>
                          </div>
                          <div className={styles.cardMeta}>
                            <span className={styles.serviceLabel}>{serviceDetails[req.service] || req.service}</span>
                            <span className={styles.timeAgo}>{formatTimeAgo(req.createdAt)}</span>
                          </div>
                          <div className={styles.locationSnippet}>
                            📍 {req.location}
                          </div>
                          <div>
                            <span className={`${styles.badge} ${
                              req.status === "received" ? styles.badgeReceived :
                              req.status === "matched" ? styles.badgeMatched :
                              req.status === "en-route" ? styles.badgeEnRoute :
                              req.status === "arrived" ? styles.badgeArrived :
                              styles.badgeCompleted
                            }`}>
                              {req.status === "received" ? "received" :
                               req.status === "matched" ? "matched" :
                               req.status === "en-route" ? "en route" :
                               req.status === "arrived" ? "arrived" :
                               "completed"}
                            </span>
                            {req.contacted && (
                              <span className={`${styles.badge} ${styles.badgeCompleted}`} style={{ marginLeft: "0.5rem", background: "rgba(34,197,94,0.12)" }}>
                                📞 Contacted
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Active Details */}
              <div className={styles.detailsPanel}>
                {activeRequest ? (
                  <div>
                    <div className={styles.detailHeader}>
                      <div className={styles.detailTitleArea}>
                        <h2 className={styles.detailTitle}>{activeRequest.name}</h2>
                        <span className={styles.detailId}>Request ID: {activeRequest.id}</span>
                      </div>
                      <div className={styles.detailActions}>
                        <a href={`tel:${activeRequest.phone}`} className="btn btn-outline btn-sm">
                          📞 Call User
                        </a>
                        <Link href={`/track?id=${activeRequest.id}`} className="btn btn-outline btn-sm" target="_blank">
                          📍 View Tracking Page
                        </Link>
                      </div>
                    </div>

                    <div className={styles.detailContent}>
                      
                      {/* Customer contact checklist */}
                      <div className={styles.contactBar}>
                        <span className={styles.contactText}>Dispatch Checklist: Log client communication</span>
                        <label className={styles.contactCheckboxWrap}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={activeRequest.contacted}
                            onChange={(e) => handleUpdateRequest(activeRequest.id, { contacted: e.target.checked })}
                          />
                          Mark as Contacted
                        </label>
                      </div>

                      {/* Request Specifications */}
                      <div>
                        <h3 className={styles.sectionTitle}>📋 Assistance Specifications</h3>
                        <div className={styles.infoGrid}>
                          <div className={styles.infoBlock}>
                            <span className={styles.infoLabel}>Requested Service</span>
                            <span className={styles.infoValue} style={{ color: "var(--amber)", fontWeight: 600 }}>
                              {serviceDetails[activeRequest.service] || activeRequest.service}
                            </span>
                          </div>
                          <div className={styles.infoBlock}>
                            <span className={styles.infoLabel}>Created At</span>
                            <span className={styles.infoValue}>
                              {new Date(activeRequest.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className={styles.infoBlock}>
                            <span className={styles.infoLabel}>Vehicle Specifications</span>
                            <span className={styles.infoValue}>
                              {[activeRequest.vehicleYear, activeRequest.vehicleMake, activeRequest.vehicleModel, activeRequest.vehicleColor].filter(Boolean).join(" ") || "Not Specified"} ({activeRequest.vehicleType})
                            </span>
                          </div>
                          <div className={styles.infoBlock}>
                            <span className={styles.infoLabel}>Contact Number</span>
                            <span className={styles.infoValue}>{activeRequest.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stranded Location */}
                      <div>
                        <h3 className={styles.sectionTitle}>📍 Location details</h3>
                        <div className={styles.infoGrid} style={{ gridTemplateColumns: "1fr" }}>
                          <div className={styles.infoBlock}>
                            <span className={styles.infoLabel}>Stranded Location Address</span>
                            <span className={styles.infoValue}>📍 {activeRequest.location}</span>
                          </div>
                          {activeRequest.landmark && (
                            <div className={styles.infoBlock}>
                              <span className={styles.infoLabel}>Described Landmark</span>
                              <span className={styles.infoValue}>🗺️ {activeRequest.landmark}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* User's exact problem description */}
                      <div>
                        <h3 className={styles.sectionTitle}>🛠️ Description of Problem</h3>
                        <div className={styles.problemDesc}>
                          {activeRequest.notes || "No description provided by the customer."}
                        </div>
                      </div>

                      {/* Provider Dispatcher */}
                      <div>
                        <h3 className={styles.sectionTitle}>👷 Dispatch Technician</h3>
                        <div className={styles.dispatchSection}>
                          {activeRequest.assignedProvider ? (
                            <div>
                              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                                Technician currently dispatched to this mission:
                              </p>
                              <div className={styles.providerRow} style={{ borderColor: "var(--success)" }}>
                                <div className={styles.providerProfile}>
                                  <div className={styles.providerAvatar} style={{ background: "rgba(34,197,94,0.1)", color: "var(--success)" }}>
                                    {activeRequest.assignedProvider.avatar}
                                  </div>
                                  <div className={styles.providerInfo}>
                                    <span className={styles.providerName}>{activeRequest.assignedProvider.name}</span>
                                    <span className={styles.providerDetails}>
                                      Plate: {activeRequest.assignedProvider.plate} | Vehicle: {activeRequest.assignedProvider.vehicle}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <a href={`tel:${activeRequest.assignedProvider.phone}`} className="btn btn-outline btn-sm" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}>
                                    Call Tech
                                  </a>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                                Select a provider matching specialty (<strong>{activeRequest.service}</strong>) to dispatch:
                              </p>
                              <div className={styles.dispatcherList}>
                                {providers.map((p) => {
                                  const isSpecialist = p.speciality === activeRequest.service;
                                  return (
                                    <div
                                      key={p.id}
                                      className={styles.providerRow}
                                      style={{
                                        border: isSpecialist ? "1px solid rgba(245,158,11,0.25)" : "1px solid var(--border)",
                                      }}
                                    >
                                      <div className={styles.providerProfile}>
                                        <div className={styles.providerAvatar}>{p.avatar}</div>
                                        <div className={styles.providerInfo}>
                                          <span className={styles.providerName}>
                                            {p.name} {isSpecialist && <span style={{ color: "var(--amber)", fontSize: "0.75rem" }}>(Match)</span>}
                                          </span>
                                          <div className={styles.providerRating}>
                                            ★ {p.rating} ({p.reviews} reviews) • {p.vehicle}
                                          </div>
                                        </div>
                                      </div>
                                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                        <span className={`${styles.providerBadge} ${
                                          p.status === "Available" ? styles.statusAvailable : styles.statusDispatched
                                        }`}>
                                          {p.status}
                                        </span>
                                        <button
                                          className={styles.dispatchBtn}
                                          disabled={p.status !== "Available"}
                                          style={{ opacity: p.status === "Available" ? 1 : 0.4 }}
                                          onClick={() => handleDispatch(activeRequest, p)}
                                        >
                                          Dispatch
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status updates dashboard controls */}
                      {activeRequest.assignedProvider && (
                        <div>
                          <h3 className={styles.sectionTitle}>⚙️ Progress Controls</h3>
                          <div className={styles.statusSliderCard}>
                            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                              {activeRequest.status === "completed"
                                ? "Completed after the customer confirmed on their tracking page."
                                : "Change request progression manually. The customer confirms completion from their tracking link."}
                            </p>
                            <div className={styles.statusStepContainer}>
                              {[
                                { key: "matched", label: "Matched" },
                                { key: "en-route", label: "En Route" },
                                { key: "arrived", label: "Arrived" },
                              ].map((step) => {
                                const isCurrent = activeRequest.status === step.key;
                                return (
                                  <button
                                    key={step.key}
                                    onClick={() => handleStatusChange(activeRequest, step.key as RequestData["status"])}
                                    className={`${styles.statusStepBtn} ${
                                      isCurrent ? styles.statusStepBtnActive : ""
                                    }`}
                                    disabled={activeRequest.status === "completed"}
                                  >
                                    {step.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyDetails}>
                    <span className={styles.emptyIcon}>🚨</span>
                    <h3>No Request Selected</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                      Select a customer roadside request from the left panel to review notes, contact, and dispatch servicemen.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
