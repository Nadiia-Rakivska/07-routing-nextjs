"use client";
import Modal from "@/components/Modal/Modal";
import css from "./NoteDetails.module.css";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NotePreview() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };

  const { data } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>
          <p className={css.content}>{data?.content}</p>
          <p className={css.date}>{data?.updatedAt}</p>
        </div>
        <span className={css.tag}>{data?.tag}</span>
      </div>
      <button onClick={closeModal} className={css.backBtn}>
        Close
      </button>
    </Modal>
  );
}
