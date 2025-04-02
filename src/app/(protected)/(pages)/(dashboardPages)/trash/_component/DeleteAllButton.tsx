"use client";
import { Project } from "@prisma/client";
import AlertDialogBox from "@/components/global/alert-dialog";
import React from "react";
import { deletedAllProjects } from "@/actions/project";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  Projects: Project[];
};

const DeleteAllButton = ({ Projects }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleDeleteAllProjects = async () => {
    setLoading(true);

    if (!Projects || Projects.length === 0) {
      setLoading(false);
      toast.error("Error", {
        description: "No Projects found!!",
      });
      setOpen(false);
      return;
    }
    try {
      const res = await deletedAllProjects(
        Projects.map((project) => project.id)
      );
      if (res.status !== 200) {
        throw new Error("Failed to delete all projects.");
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to delete all projects.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <AlertDialogBox
      description="This action cannot be undone.
        This will permanently delete all your projects abd remove your data from our severs."
      className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
      loading={loading}
      open={open}
      onClick={handleDeleteAllProjects}
      handleOpen={() => setOpen(!open)}
    >
      <Button
        variant={"ghost"}
        size={"lg"}
        className="bg-background-80 rounded-lg dark:hover:bg-background-90 text-primary font-semibold hover:text-white"
        disabled={loading}
      >
        <Trash className="w-4 h-4" />
        Delete All
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;
