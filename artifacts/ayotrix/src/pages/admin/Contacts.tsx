import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetContacts, getGetContactsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminContacts() {
  const { data: contacts, isLoading } = useGetContacts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contacts & Inquiries</h1>
        <p className="text-muted-foreground">View messages submitted via the public contact form.</p>
      </div>

      <Card className="bg-card border-border rounded-2xl">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-[150px]">Date</TableHead>
                  <TableHead className="w-[200px]">Contact Info</TableHead>
                  <TableHead className="w-[200px]">Subject</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts?.map((contact) => (
                  <TableRow key={contact.id} className="border-border align-top">
                    <TableCell className="py-4 text-muted-foreground">
                      {new Date(contact.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-medium text-white">{contact.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{contact.email}</div>
                      <div className="text-sm text-muted-foreground">{contact.phone}</div>
                    </TableCell>
                    <TableCell className="py-4 font-medium">
                      {contact.subject || '-'}
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground whitespace-pre-wrap">
                      {contact.message}
                    </TableCell>
                  </TableRow>
                ))}
                {contacts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      No contacts found.
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
