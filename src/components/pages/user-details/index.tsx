// src/components/pages/user-details/index.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Pencil } from "lucide-react";

import { EditUserDialog, ResetPasswordDialog, SuspendUserDialog } from "@/components/dialog/user-action-dialogs";
import { Button } from "@/components/ui/button";
import { useSuspendUser, useUnsuspendUser, useUser, useUserActivity } from "@/hooks/useUsers";
import { formatDate } from "@/utils/formatDate";
import type { SuspendUserPayload } from "@/types/users";
import PageHeader from "@/components/common/page-header";
import { ProfileInfoCard } from "./components/profile-info-card";
import { RecentActivity } from "./components/recent-activity";
import { AccountSidebar } from "./components/account-sidebar";
import { UserDetailsSkeleton } from "@/components/skeletons";
import { ErrorMessage } from "@/components/common/error-message";

const PLACEHOLDER = "—";

export function UserDetailsPage() {
    const params = useParams<{ id: string }>();
    const userId = params?.id ?? "";
    const { data: user, isLoading, isError, refetch } = useUser(userId);
    const { data: activities } = useUserActivity(userId);
    const suspendMutation = useSuspendUser();
    const unsuspendMutation = useUnsuspendUser();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
    const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);

    const fullName = user?.fullName?.trim() || `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
    const avatarUrl = user?.avatarUrl || null;
    const subscriptionTagline = user?.subscription?.planName ? `${user.subscription.planName} Plan` : "No active subscription";
    const subscriptionPlanType = user?.subscription?.planType ?? PLACEHOLDER;
    const subscriptionRenewal = formatDate(user?.subscription?.renewalDate);
    const subscriptionProgress = user?.subscription?.progressPercentage ?? 0;
    const ordersCount = user?.quickStats?.ordersCount ?? 0;
    const totalSpent = user?.quickStats?.totalSpent ?? 0;
    const isSuspended = user?.suspension?.isSuspended ?? false;

    const userSummary = user ? [
        { label: "Full Name", value: fullName || PLACEHOLDER },
        { label: "Email", value: user.email },
        { label: "Account ID", value: user.id }
    ] : [];

    if (isLoading) {
        return <UserDetailsSkeleton />;
    }

    if (isError) {
        return (
            <ErrorMessage
                message="User not found."
                onRetry={() => refetch()}
            />
        );
    }

    const handleSuspensionConfirm = (data: SuspendUserPayload) => {
        if (!user?.id) return;

        if (isSuspended) {
            unsuspendMutation.mutate(user.id, {
                onSuccess: () => setIsSuspendDialogOpen(false),
            });
        } else {
            suspendMutation.mutate(
                { id: user.id, payload: data },
                {
                    onSuccess: () => setIsSuspendDialogOpen(false),
                }
            );
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
                <PageHeader title="User Details" />
                <Button
                    variant="outline"
                    className="h-9 px-4 text-[11px]"
                    onClick={() => setIsEditDialogOpen(true)}
                    disabled={!user}
                >
                    <Pencil className="size-3.5" />
                    Edit User
                </Button>
            </div>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_230px]">
                <div className="space-y-5">
                    <ProfileInfoCard
                        user={user}
                        fullName={fullName}
                        avatarUrl={avatarUrl}
                        placeholder={PLACEHOLDER}
                        subscriptionTagline={subscriptionTagline}
                    />

                    <RecentActivity data={activities} />
                </div>

                <AccountSidebar
                    user={user}
                    isSuspended={isSuspended}
                    subscriptionPlanType={subscriptionPlanType}
                    subscriptionRenewal={subscriptionRenewal}
                    subscriptionProgress={subscriptionProgress}
                    ordersCount={ordersCount}
                    totalSpent={totalSpent}
                    onResetPassword={() => setIsResetPasswordDialogOpen(true)}
                    onToggleSuspend={() => setIsSuspendDialogOpen(true)}
                />
            </section>

            <EditUserDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                user={user}
            />

            <ResetPasswordDialog
                open={isResetPasswordDialogOpen}
                onOpenChange={setIsResetPasswordDialogOpen}
                userId={user?.id}
            />

            <SuspendUserDialog
                open={isSuspendDialogOpen}
                onOpenChange={setIsSuspendDialogOpen}
                isSuspended={isSuspended}
                isLoading={suspendMutation.isPending || unsuspendMutation.isPending}
                title={isSuspended ? "Unsuspend User Account" : "Suspend User Account"}
                summaryDetails={userSummary}
                onConfirm={handleSuspensionConfirm}
            />
        </div>
    );
}
