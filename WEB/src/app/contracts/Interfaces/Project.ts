import { ProjectConfiguration } from './ProjectConfiguration';

export interface Project {

  projectId: number;
  shortString?: string;
  longString: string;
  projectConfiguration: ProjectConfiguration;
  isSelected?: boolean;
  isDeleted?: boolean;

}
