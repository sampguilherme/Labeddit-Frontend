import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { goToFeedPage } from '../../Router/coordinator';
import { HEADERS } from '../../constants/headers';
import { BASE_URL } from '../../constants/apiUrl';



export const DeleteModal = ({isOpen, onClose, setPostDeleted, id, isOnCommentPage}) => {

const navigate = useNavigate()

const deletePost = async () => {
  try{
      await axios.delete(`${BASE_URL}/posts/${id}`, HEADERS )
      if(isOnCommentPage){
          goToFeedPage(navigate)
      }
      setPostDeleted(true)
  } catch (error) {
      console.log(error)
  }
}
    
return (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tem certeza de que deseja deletar esta postagem?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Esta ação é irreversível e a postagem será removida permanentemente. Por favor, confirme sua decisão antes de prosseguir.
        </ModalBody>

        <ModalFooter>
          <Button border={"1px solid #e0e0e0"} _hover={{bgColor: "#e0e0e0"}} variant='ghost' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button border={"1px solid #FE4847"} _hover={{bgColor: "#FE4847", color: "white"}} variant='ghost' onClick={() => deletePost()}>Deletar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
)
}