import { CSSProperties } from 'react';

export const tableStyles: { [key: string]: CSSProperties } = {
  container: {
    marginTop: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxHeight: 'none',
    width: '800px',
    minWidth: '800px',
    overflowX: 'auto',
  },
  outerTable: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
  },
  thead: {
    backgroundColor: '#f9f9f9',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    display: 'table-header-group',
  },
  headerCell: {
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
    borderBottom: '2px solid #ccc',
    minWidth: '120px',
  },
  tbody: {
    width: '100%',
  },
  tr: {
    width: '100%',
    tableLayout: 'fixed',
  },
  bodyCell: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
    wordBreak: 'break-word',
  },
  scrollableBody: {
    maxHeight: '400px',
    overflowY: 'auto',
    display: 'block',
  },
};