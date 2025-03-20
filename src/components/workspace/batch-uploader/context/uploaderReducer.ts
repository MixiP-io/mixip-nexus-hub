import { UploaderState, UploaderAction } from './types';
import { generateUniqueId } from '../utils/fileUtils';
import { calculateTotalProgress } from '../utils/uploadUtils';
import { FileStatus } from '../types';

export const initialState: UploaderState = {
  // File state
  files: [],
  overallProgress: 0,
  isUploading: false,
  uploadComplete: false,
  uploadResults: null,
  
  // Navigation state
  selectedProject: null,
  selectedProjectName: null,
  selectedFolder: 'root',
  
  // Metadata state
  tags: [],
  selectedLicense: 'standard',
  usageRights: {
    commercial: false,
    editorial: false,
    perpetual: false,
    worldwide: false
  },
  
  // UI state
  activeView: 'source',
  activeSource: 'computer'
};

export function uploaderReducer(state: UploaderState, action: UploaderAction): UploaderState {
  switch (action.type) {
    case 'ADD_FILES': {
      const newFiles = action.payload.map(file => {
        // Generate unique ID for each file
        const id = generateUniqueId();
        
        return {
          id,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'queued' as FileStatus,
          source: state.activeSource,
          file,
          preview: null
        };
      });
      
      const updatedFiles = [...state.files, ...newFiles];
      return {
        ...state,
        files: updatedFiles,
        overallProgress: calculateTotalProgress(updatedFiles)
      };
    }
    
    case 'REMOVE_FILE': {
      const updatedFiles = state.files.filter(file => file.id !== action.payload);
      return {
        ...state,
        files: updatedFiles,
        overallProgress: calculateTotalProgress(updatedFiles)
      };
    }
    
    case 'CLEAR_FILES':
      return {
        ...state,
        files: [],
        overallProgress: 0,
        uploadComplete: false,
        uploadResults: null
      };
    
    case 'UPDATE_FILE_PROGRESS': {
      const { fileId, progress } = action.payload;
      const updatedFiles = state.files.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              progress, 
              status: progress === 100 ? 'processing' as FileStatus : 'uploading' as FileStatus
            } 
          : file
      );
      
      return {
        ...state,
        files: updatedFiles,
        overallProgress: calculateTotalProgress(updatedFiles)
      };
    }
    
    case 'UPDATE_FILE_STATUS': {
      const { fileId, status, errorMessage } = action.payload;
      const updatedFiles = state.files.map(file => 
        file.id === fileId 
          ? { ...file, status, errorMessage } 
          : file
      );
      
      return {
        ...state,
        files: updatedFiles,
        overallProgress: calculateTotalProgress(updatedFiles)
      };
    }
    
    case 'SET_OVERALL_PROGRESS':
      return {
        ...state,
        overallProgress: action.payload
      };
    
    case 'SET_IS_UPLOADING':
      return {
        ...state,
        isUploading: action.payload
      };
    
    case 'SET_UPLOAD_COMPLETE':
      return {
        ...state,
        uploadComplete: action.payload,
        // Reset upload results if setting to false
        uploadResults: action.payload === false ? null : state.uploadResults
      };
    
    case 'SET_UPLOAD_RESULTS':
      return {
        ...state,
        uploadResults: action.payload
      };
    
    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: action.payload.projectId,
        selectedProjectName: action.payload.projectName
      };
    
    case 'SET_SELECTED_FOLDER':
      return {
        ...state,
        selectedFolder: action.payload
      };
    
    case 'SET_TAGS':
      return {
        ...state,
        tags: action.payload
      };
    
    case 'SET_LICENSE':
      return {
        ...state,
        selectedLicense: action.payload
      };
    
    case 'SET_USAGE_RIGHTS':
      return {
        ...state,
        usageRights: action.payload
      };
    
    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        activeView: action.payload
      };
    
    case 'SET_ACTIVE_SOURCE':
      return {
        ...state,
        activeSource: action.payload
      };
    
    default:
      return state;
  }
}
