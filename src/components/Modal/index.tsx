import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Modal } from 'antd'
import { FormCustom } from '@components/FormCollectionCustom/index.'
import { collectionsThunk } from '@/app/collections-reducer'
import { useActions } from '@/hooks/useActions'
import { LoadingSpinner } from '@components/Loader'
import { FormItemCustom } from '@components/FormItemCustom'
import { ArtCollectionCreate } from '@/types/interfaces'

interface ModalCustomProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  collectionId?: string
  createItemMode: boolean
  titles?: string[]
}

export const ModalCustom = ({
  open,
  setOpen,
  collectionId,
  createItemMode,
  titles,
}: ModalCustomProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const { createCollection } = useActions(collectionsThunk)

  const handleCancel = () => {
    setOpen(false)
  }
  const handleSubmit = async (data: ArtCollectionCreate) => {
    setConfirmLoading(true)
    try {
      await createCollection({ data })
      setOpen(false)
    } catch (error: any) {
      console.log('error', error)
      throw new Error(`Error create collection: ${error.response.data.message}`)
    } finally {
      setConfirmLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      visible={open}
      confirmLoading={confirmLoading}
      okText={'Save'}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button form="myForm" key="submit" htmlType="submit">
          Save
        </Button>,
      ]}
    >
      {confirmLoading ? (
        <LoadingSpinner />
      ) : createItemMode ? (
        <FormItemCustom setOpen={setOpen} collectionId={collectionId} titles={titles} />
      ) : (
        <FormCustom onSubmit={handleSubmit} editMode={false} />
      )}
    </Modal>
  )
}
