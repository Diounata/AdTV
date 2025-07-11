import { AnnouncementFormDialog } from ".";
import { useEditAnnouncement } from "../../hooks/forms/use-edit-announcement-form";
import { Announcement } from "../../types/announcement";

interface Props {
  announcement: Announcement;
}

export function EditAnnouncementFormDialog({ announcement }: Props) {
  const {
    editAnnouncementForm,
    onSubmit,
    editingAnnouncement,
    setEditingAnnouncement,
  } = useEditAnnouncement({ announcementId: announcement.id });

  return (
    <AnnouncementFormDialog
      type="edit"
      form={editAnnouncementForm}
      onSubmit={onSubmit}
      isOpen={editingAnnouncement === announcement.id}
      onOpenChange={() => setEditingAnnouncement(null)}
    />
  );
}
