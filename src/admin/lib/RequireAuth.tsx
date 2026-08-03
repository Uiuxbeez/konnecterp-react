import React from "react";
import { Redirect } from "wouter";
import { useAuth } from "./AuthContext";
import { Spinner } from "@/components/ui/spinner";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { username, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Spinner />
      </div>
    );
  }

  if (!username) {
    return <Redirect to="/admin/login" />;
  }

  return <>{children}</>;
}
