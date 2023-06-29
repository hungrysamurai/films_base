import { motion} from 'framer-motion';

const Modal = ({hideModal, changeModalImage, control, modal}) => {
 return (
   <motion.div 
        animate={{opacity: 1}}
        initial={{opacity:0}}
        exit={{opacity: 0}}
        className="modal-container" 
        onClick={(e) => {
          hideModal(e.target)
        }}>

        <div className="modal-index-controls">

          <div className="prev-btn" onClick={() => {
            changeModalImage('prev');
          }}>

            <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-8.74228e-07 18L30 0.679488L30 35.3205L-8.74228e-07 18Z" fill="var(--primary-color)"/>
            </svg>
          </div>
          <div className="next-btn" onClick={() => {
            changeModalImage('next')
          }}>
            <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M30 18L4.45043e-07 35.3205L3.19526e-08 0.679491L30 18Z" fill="var(--primary-color)"/>
            </svg>
          </div>

        </div>
       
        <motion.div 
          className="modal-images-wrapper"
          animate={control}
          initial={{
            x: `-${modal.index * 100}%`
          }}
        >
            {modal.data}
        </motion.div>
      </motion.div>
 )
}

export default Modal;