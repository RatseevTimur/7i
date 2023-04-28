import { Position, MarkerType } from 'reactflow';

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const {
    width: intersectionNodeWidth,
    height: intersectionNodeHeight,
    positionAbsolute: intersectionNodePosition,
  } = intersectionNode;
  const targetPosition = targetNode.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + w;
  const y1 = targetPosition.y + h;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

export function createNodesAndEdges() {
  const nodes = initialNodes;
  const edges = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  nodes.push({ id: 'target', data: { label: 'Target' }, position: center });

  for (let i = 0; i < 8; i++) {
    const degrees = i * (360 / 8);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({ id: `${i}`, data: { label: 'Source', image: initialNodes[i].data.image,
        dateStart: initialNodes[i].data.dateStart, dateEnd: initialNodes[i].data.dateEnd, lastName: initialNodes[i].data.lastName,
        firstName: initialNodes[i].data.firstName, patronymic: initialNodes[i].data.patronymic, },
     position: { x, y }, type: initialNodes[i].type, style: initialNodes[i].style } );

    edges.push({
      id: `edge-${i}`,
      target: 'target',
      source: `${i}`,
      type: 'floating',
      markerEnd: {
        type: MarkerType.Arrow,
      },
    });
  }

  return { nodes, edges };
}



export const initialNodes = [
    {
      id: '1',
      //type: 'input',
      type: 'custom',
      data: { label: '1',
        image: 'https://thumbs.dreamstime.com/b/%D1%81%D1%82%D0%B0%D1%80%D0%B8%D0%BD%D0%BD%D0%BE%D0%B5-%D1%84%D0%BE%D1%82%D0%BE-%D1%88%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%BE%D0%B5-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81-%D0%BE%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%BF%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE%D0%B9-220531861.jpg' },
      position: { x: 0, y: 50 },
      sourcePosition: 'right',
      style: {
        backgroundColor: '#BEE3F8',
        // backgroundImage: `url("https://thumbs.dreamstime.com/b/%D1%81%D1%82%D0%B0%D1%80%D0%B8%D0%BD%D0%BD%D0%BE%D0%B5-%D1%84%D0%BE%D1%82%D0%BE-%D1%88%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%B0-%D1%81%D1%82%D0%B0%D1%80%D0%BE%D0%B5-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81-%D0%BE%D1%80%D0%B8%D0%B3%D0%B8%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9-%D0%BF%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE%D0%B9-220531861.jpg")`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'contain',
        // backgroundPosition: 'center'
    },
    },
    {
      id: '2',
      type: 'custom',
      data: { label: '2', dateStart: '11.11.1900',  dateEnd: '11.11.1990', lastName: 'Иванов', firstName: 'Иван', patronymic: 'Иванович',
      image: 'https://api.rbsmi.ru/attachments/0a6eecc4da3004fcb4a637757df0f2c930da39e2/store/crop/0/0/2354/1568/1600/0/0/a84195c2fecbe4b1ac37f068f3d8afcb63748451f25b665a6527302def95/bc2bfed3d43b301005fc615c3ebc1b69.jpg'},
      position: { x: 200, y: 50 },
      style: {
        backgroundColor: '#90CDF4',
        // backgroundImage: `url(data.image)`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'contain',
        // backgroundPosition: 'center'
      },
    },
    {
      id: '3',
      type: 'custom',
      data: { label: '3', image: 'https://i.pinimg.com/originals/76/68/76/766876fe6c95c98e55508cae13bec8cb.jpg' },
      position: { x: 400, y: 0 },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: {
        backgroundColor: '#63B3ED',
        // backgroundImage: `url("https://i.pinimg.com/originals/76/68/76/766876fe6c95c98e55508cae13bec8cb.jpg")`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'contain',
        // backgroundPosition: 'center'
      },
    },
    {
      id: '4',
      type: 'custom',
      data: { label: '▲' },
      position: { x: 400, y: 100 },
      targetPosition: 'left',
      sourcePosition: 'right',
      style: {
        backgroundColor: '#63B3ED',
      },
    },
    {
      id: '5',
      type: 'custom',
      data: { label: '▲' },
      position: { x: 600, y: 0 },
      targetPosition: 'left',
      style: {
        backgroundColor: '#4299E1',
      },
    },
    {
      id: '6',
      //type: 'output',
      type: 'custom',
      data: { label: '▲' },
      position: { x: 600, y: 100 },
      targetPosition: 'left',
      style: {
        backgroundColor: '#4299E1',
      },
    },
  ];
  
  export const initialEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
    },
    {
      id: 'e2a-3',
      source: '2',
      target: '3',
      sourceHandle: 'a',
    },
    {
      id: 'e2b-4',
      source: '2',
      target: '4',
      sourceHandle: 'b',
    },
    {
      id: 'e3a-5',
      source: '3',
      target: '5',
    },
    {
      id: 'e4b-6',
      source: '4',
      target: '6',
    },
  ];
  


// const position = { x: 0, y: 0 };
// const edgeType = 'smoothstep';

// export const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'input' },
//     position,
//   },
//   {
//     id: '2',
//     data: { label: 'node 2' },
//     position,
//   },
//   {
//     id: '2a',
//     data: { label: 'node 2a' },
//     position,
//   },
//   {
//     id: '2b',
//     data: { label: 'node 2b' },
//     position,
//   },
//   {
//     id: '2c',
//     data: { label: 'node 2c' },
//     position,
//   },
//   {
//     id: '2d',
//     data: { label: 'node 2d' },
//     position,
//   },
//   {
//     id: '3',
//     data: { label: 'node 3' },
//     position,
//   },
//   {
//     id: '4',
//     data: { label: 'node 4' },
//     position,
//   },
//   {
//     id: '5',
//     data: { label: 'node 5' },
//     position,
//   },
//   {
//     id: '6',
//     type: 'output',
//     data: { label: 'output' },
//     position,
//   },
//   { id: '7', type: 'output', data: { label: 'output' }, position },
// ];

// export const initialEdges = [
//   { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
//   { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
//   { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
//   { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
//   { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
//   { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
//   { id: 'e45', source: '4', target: '5', type: edgeType, animated: true },
//   { id: 'e56', source: '5', target: '6', type: edgeType, animated: true },
//   { id: 'e57', source: '5', target: '7', type: edgeType, animated: true },
// ];
