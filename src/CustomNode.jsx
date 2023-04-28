import React, { memo, useRef } from 'react';
import { Background, Handle, Position } from 'reactflow';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import ModalWindow from './ModalWindow'

import './item.css'


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


export default memo(({ data, isConnectable }) => {
  const refHoverItem = useRef(null)
  const refHoverItemHandle = useRef(null)
  const hoverEffect = () => {
    refHoverItem.current.style.display = 'block'
    refHoverItemHandle.current.style.display = 'block'
  }
  const hoverOff = () => {
    refHoverItem.current.style.display = 'none'
    refHoverItemHandle.current.style.display = 'none'
  }

  return (
    <>
      <div className='block' onMouseEnter={() => hoverEffect()} onMouseLeave={() => hoverOff()}>
        <div className='image-block' style={{backgroundImage: `url(${data.image  || 'https://highloadcup.ru/static/core/img/placeholder_200.png'})`}}/>
        <p>
          {data.lastName} {data.firstName} {data.patronymic}
          <br/>
          {data.dateStart} - {data.dateEnd}
        </p>

        <ModalWindow data={data} refHoverItem={refHoverItem} refHoverItemHandle={refHoverItemHandle}/>
      </div>
    <div /*ref={refHoverItemHandle} nMouseEnter={() => hoverEffect()} onMouseLeave={() => hoverOff()} style={{display: 'none'}}*/>
      <Handle
        type="target"
        id="a"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        // style={{ bottom: 32, top: 'auto' }}
        isConnectable={isConnectable}
      />
      {/* <div>▼</div> */}

      <Handle
        type="source"
        position={Position.Top}
        id="b"
        style={{ top: -40 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        // style={{ bottom: 5, top: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
    </>
  );
});
