import { Dispatch, SetStateAction, useState } from 'react'
import { Button, Modal } from 'antd'
import { FormCustom } from '@components/FormCustom/index.'
import { collectionsThunk } from '@/app/collections-reducer'
import { useActions } from '@/hooks/useActions'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { ArtCollectionCreate } from '@/data/data'

interface ModalCustomProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalCustom = ({ open, setOpen }: ModalCustomProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const token = useSelector<RootState, string>((state) => state.auth.token)
  const { createCollections } = useActions(collectionsThunk)

  const handleCancel = () => {
    setOpen(false)
  }
  const handleSubmit = async (data: ArtCollectionCreate) => {
    setConfirmLoading(true)
    try {
      await createCollections({ data, token })
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
      title="Title"
      open={open}
      visible={open}
      confirmLoading={confirmLoading}
      okText={'Save'}
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button form="myForm" key="submit" htmlType="submit">
          Save
        </Button>,
      ]}
    >
      <FormCustom onSubmit={handleSubmit} />
    </Modal>
  )
}
