import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../services/api.js";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import useApplications from "../hooks/useApplications.js";

const STATUSES = ["Saved", "Applied", "Interview", "Offer", "Rejected"];

export default function Tracker() {
  const { applications, setApplications, loading } = useApplications();

  const columns = useMemo(() => {
    const byStatus = new Map();
    STATUSES.forEach((s) => byStatus.set(s, []));
    applications.forEach((a) => {
      const list = byStatus.get(a.status) || [];
      list.push(a);
      byStatus.set(a.status, list);
    });
    return STATUSES.map((status) => ({
      status,
      items: byStatus.get(status) || [],
    }));
  }, [applications]);

  async function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const appId = Number(draggableId);
    const newStatus = destination.droppableId;
    const app = applications.find((a) => a.id === appId);

    // Optimistic update for calm responsiveness.
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a)),
    );

    try {
      await api.updateApplication(appId, {
        status: newStatus,
        notes: app?.notes || "",
      });
    } catch {
      // In case of failure, do a refresh to restore consistency.
      const res = await api.getApplications();
      setApplications(res?.applications || []);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white/60 p-6 shadow-calm">
        <h1 className="text-xl font-semibold text-ink">Application Tracker</h1>
        <p className="mt-2 text-muted text-sm">Move cards gently as they progress.</p>
      </section>

      {loading ? (
        <div className="grid gap-3 md:grid-cols-2">
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-28" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid gap-3 lg:grid-cols-5">
            {columns.map(({ status, items }) => (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={[
                      "rounded-3xl bg-white/40 p-3",
                      snapshot.isDraggingOver ? "bg-white/60" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between px-2 py-1">
                      <div className="text-sm font-semibold text-ink">{status}</div>
                      <div className="text-xs text-muted">{items.length}</div>
                    </div>

                    <div className="space-y-3 px-1 pb-2">
                      {items.map((app, index) => (
                        <Draggable
                          draggableId={String(app.id)}
                          index={index}
                          key={app.id}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className={[
                                "rounded-2xl bg-white p-3 shadow-calm transition-transform",
                                dragSnapshot.isDragging ? "scale-[1.01]" : "",
                              ].join(" ")}
                            >
                              <div className="text-sm font-semibold text-ink">
                                {app.jobTitle}
                              </div>
                              <div className="mt-1 text-xs text-muted">
                                {app.company}
                              </div>
                              <div className="mt-2 text-xs text-muted">
                                Added:{" "}
                                {app.dateAdded
                                  ? new Date(app.dateAdded).toLocaleDateString()
                                  : ""}
                              </div>
                              {app.notes ? (
                                <div className="mt-2 text-xs text-muted line-clamp-2">
                                  {app.notes}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
