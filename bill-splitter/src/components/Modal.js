import ReactDOM from 'react-dom';

function Backdrop(props){
return (
    <div className='full-blurred-background'
         onClick = {props.onClose}
    ></div>
)
}

function ModalOverlay(props){
return (
    <div className='modal'>
        <div className='content'>{props.children}</div>
    </div>
)
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;