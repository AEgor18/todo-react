import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Link } from 'react-router-dom';

function DndPage() {
  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'First task' },
        { id: '2', content: 'Second task' },
        { id: '3', content: 'Third task' },
        { id: '4', content: 'Fourth task' },
        { id: '5', content: 'Fifth task' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [],
    },
    done: {
      name: 'Done',
      items: [],
    },
    blocked: {
      name: 'Blocked',
      items: [],
    },
  });

  const onDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over) return;
  
    const sourceColumnId = active.data.current.droppableId;
    const destinationColumnId = over.id;
  
    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];
  
    const activeIndex = sourceColumn.items.findIndex(item => item.id === active.id);
    
    let overIndex = destinationColumn.items.findIndex(item => item.id === over.id);
  
    if (sourceColumnId === destinationColumnId && activeIndex === overIndex) return;
  
    if (destinationColumn.items.length === 0 || overIndex === -1) {
      overIndex = 0;
    }
  
    if (sourceColumnId === destinationColumnId) {
      const newItems = arrayMove(sourceColumn.items, activeIndex, overIndex);
      setColumns({
        ...columns,
        [sourceColumnId]: { ...sourceColumn, items: newItems },
      });
    } else {

      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
  
      const [removedItem] = sourceItems.splice(activeIndex, 1);
      destinationItems.splice(overIndex, 0, removedItem);
  
      setColumns({
        ...columns,
        [sourceColumnId]: { ...sourceColumn, items: sourceItems },
        [destinationColumnId]: { ...destinationColumn, items: destinationItems },
      });
    }
  };
  
  const deleteTodo = (columnId, itemId) => {
    setColumns((prevColumns) => {
      const updatedItems = prevColumns[columnId].items.filter(item => item.id !== itemId);
      return {
        ...prevColumns,
        [columnId]: { ...prevColumns[columnId], items: updatedItems },
      };
    });
  };

  return (
    <div
      className="container py-4 d-flex flex-column align-items-center"
      style={{
        maxWidth: '1000px',
        marginTop: '50px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <DndContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                width: '250px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2>{column.name}</h2>
              <DroppableColumn columnId={columnId} items={column.items} deleteTodo={deleteTodo} />
            </div>
          ))}
        </div>
      </DndContext>
      <Link to="/" style={{ textDecoration: 'none', marginTop: '20px' }}>
        <button className="btn btn-primary btn-sm">Перейти к To-Do</button>
      </Link>
    </div>
  );
}

function DroppableColumn({ columnId, items, deleteTodo }) {
  const { setNodeRef } = useDroppable({
    id: columnId,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: 'lightgrey',
        padding: 4,
        width: '100%',
        minHeight: 500,
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <DraggableItem key={item.id} item={item} index={index} columnId={columnId} deleteTodo={deleteTodo} />
        ))}
      </SortableContext>
    </div>
  );
}

function DraggableItem({ item, index, columnId, deleteTodo }) {
  const { setNodeRef, attributes, listeners } = useDraggable({
    id: item.id,
    index,
    data: { droppableId: columnId },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        userSelect: 'none',
        padding: '16px',
        margin: '0 0 8px 0',
        minHeight: '50px',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      <span>{item.content}</span>
        <button
          className="btn btn-danger btn-sm"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '5px 10px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(columnId, item.id); 
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
    </div>
  );
}

export default DndPage;
