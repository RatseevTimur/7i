import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import './item.css'

export const ImportImage = () => {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div>
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
        </div>

    );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <ImportImage/>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const ModalWindow = ({ data, refHoverItem, refHoverItemHandle }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        refHoverItem.current.style.display = 'none'
        refHoverItemHandle.current.style.display = 'none'
      setOpen(false);
    };

    return (
    
        <div>
            <div onClick={handleOpen} ref={refHoverItem} className="open-modal" style={{display: 'none'}}></div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 600, height: 500 }}>
            <div className='modal-block'>
              <div className='avatar'
                style={{backgroundImage: `url(${data.image  || 'https://highloadcup.ru/static/core/img/placeholder_200.png'})`}}> 
              </div>
              <div>
                <h2 id="parent-modal-title">{data.lastName} {data.firstName} {data.patronymic}</h2>
                <p id="parent-modal-description">{data.dateStart} - {data.dateEnd}</p>
              </div>
              
            </div>
            <ChildModal />
          </Box>
        </Modal>
      </div>

    )
}

export default ModalWindow;