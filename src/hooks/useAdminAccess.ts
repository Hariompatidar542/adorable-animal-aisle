
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface AdminUser {
  id: string;
  user_id: string;
  granted_by: string | null;
  granted_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
}

export const useAdminAccess = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if current user is admin
  const { data: isAdmin = false, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ['is-admin', user?.id],
    queryFn: async () => {
      if (!user?.id) return false;
      
      const { data, error } = await supabase.rpc('is_user_admin', {
        user_uuid: user.id
      });
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  // Get all admin users
  const { data: adminUsers = [], isLoading: isLoadingAdmins } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as AdminUser[];
    },
    enabled: isAdmin,
  });

  // Get all user profiles for selection
  const { data: allUsers = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name', { ascending: true });
      
      if (error) throw error;
      return data as UserProfile[];
    },
    enabled: isAdmin,
  });

  // Grant admin access
  const grantAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          user_id: userId,
          granted_by: user?.id,
          is_active: true
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "Success",
        description: "Admin access granted successfully!",
      });
    },
    onError: (error) => {
      console.error('Error granting admin access:', error);
      toast({
        title: "Error",
        description: "Failed to grant admin access. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Revoke admin access
  const revokeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('admin_users')
        .update({ is_active: false })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "Success",
        description: "Admin access revoked successfully!",
      });
    },
    onError: (error) => {
      console.error('Error revoking admin access:', error);
      toast({
        title: "Error",
        description: "Failed to revoke admin access. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    isAdmin,
    isCheckingAdmin,
    adminUsers,
    isLoadingAdmins,
    allUsers,
    isLoadingUsers,
    grantAdmin: grantAdminMutation.mutate,
    revokeAdmin: revokeAdminMutation.mutate,
    isGranting: grantAdminMutation.isPending,
    isRevoking: revokeAdminMutation.isPending,
  };
};
