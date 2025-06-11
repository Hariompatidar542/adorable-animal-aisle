
import React, { useState } from 'react';
import { Users, UserPlus, Shield, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { format } from 'date-fns';

export const AdminAccessManager: React.FC = () => {
  const {
    adminUsers,
    isLoadingAdmins,
    allUsers,
    isLoadingUsers,
    grantAdmin,
    revokeAdmin,
    isGranting,
    isRevoking,
  } = useAdminAccess();

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleGrantAdmin = () => {
    if (selectedUserId) {
      grantAdmin(selectedUserId);
      setSelectedUserId('');
    }
  };

  const handleRevokeAdmin = (userId: string) => {
    if (confirm('Are you sure you want to revoke admin access for this user?')) {
      revokeAdmin(userId);
    }
  };

  const availableUsers = allUsers.filter(user => 
    !adminUsers.some(admin => admin.user_id === user.id && admin.is_active)
  );

  const activeAdmins = adminUsers.filter(admin => admin.is_active);

  if (isLoadingAdmins || isLoadingUsers) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded animate-pulse"></div>
        <div className="h-64 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Grant Admin Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a user to grant admin access" />
              </SelectTrigger>
              <SelectContent>
                {availableUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.full_name || user.email || 'Unknown User'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handleGrantAdmin}
              disabled={!selectedUserId || isGranting}
              className="gradient-primary"
            >
              <Shield className="w-4 h-4 mr-2" />
              Grant Access
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current Admin Users ({activeAdmins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeAdmins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No admin users found. Grant admin access to users above.
            </div>
          ) : (
            <div className="space-y-3">
              {activeAdmins.map(admin => {
                const userProfile = allUsers.find(user => user.id === admin.user_id);
                return (
                  <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {userProfile?.full_name || userProfile?.email || 'Unknown User'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Granted on {format(new Date(admin.granted_at), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Admin</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeAdmin(admin.user_id)}
                        disabled={isRevoking}
                        className="text-red-600 hover:text-red-700"
                      >
                        <ShieldOff className="w-4 h-4 mr-1" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
