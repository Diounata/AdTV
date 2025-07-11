"use client";
import { If } from "@/components/if";
import { Loading } from "@/components/ui/loading";
import { AnnouncementCard } from "@/features/announcements/components/announcements-listing/announcement-card";
import { AnnouncementHeader } from "@/features/announcements/components/announcements-listing/header";
import { useListAnnouncementsQuery } from "@/features/announcements/hooks/react-query/use-list-announcements-query";
import { MainContent } from "@/features/dashboard/components/main-content";

export default function AnnouncementsPage() {
  const listAnnouncementsQuery = useListAnnouncementsQuery();
  return (
    <MainContent.Root>
      <MainContent.Header>Anúncios</MainContent.Header>
      <MainContent.Content>
        <AnnouncementHeader />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
          <If condition={listAnnouncementsQuery.isLoading}>
            <Loading label="Carregando anúncios" />
          </If>

          <If condition={listAnnouncementsQuery.data?.length}>
            {listAnnouncementsQuery.data?.map((announcement) => (
              <AnnouncementCard
                announcement={announcement}
                key={announcement.id}
              />
            ))}
          </If>
        </div>
      </MainContent.Content>
    </MainContent.Root>
  );
}
