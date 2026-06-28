import React from "react";
import { useGetStats, useGetContacts } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Users, Briefcase, Smile, Inbox } from "lucide-react";

export default function AdminDashboard() {
  const { data: stats, isLoading: loadingStats } = useGetStats();
  const { data: contacts, isLoading: loadingContacts } = useGetContacts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Mission control metrics and recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold">{stats?.projectsCompleted}</div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Smile className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold">{stats?.happyClients}</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold">{stats?.yearsExperience} Yrs</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : (
              <div className="text-2xl font-bold">{stats?.teamMembers}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-primary" />
            Recent Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingContacts ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts?.slice(0, 5).map((contact) => (
                  <TableRow key={contact.id} className="border-border hover:bg-muted/50">
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium text-white">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.subject || 'No Subject'}</TableCell>
                  </TableRow>
                ))}
                {contacts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No inquiries yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
