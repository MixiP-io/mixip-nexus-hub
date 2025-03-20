
import React from 'react';
import { FilesListProps } from '../types/componentProps';
import FileListContainer from './file-list/FileListContainer';

const FilesList: React.FC<FilesListProps> = (props) => {
  return <FileListContainer {...props} />;
};

export default FilesList;
