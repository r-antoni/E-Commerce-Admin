"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"

export const StoreModal = () =>{
    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create Store"
            desc="Add a new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Form
        </Modal>
    )
}

