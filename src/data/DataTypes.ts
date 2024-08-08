export type FileSystemEntityTypes = 'file' | 'folder'

export type FileModelType = {
  id: number;
  type: 'file';
  name: string;
  folder: FolderModelType["id"];
}

export type FolderModelType = {
  id: number;
  type: "folder";
  name: string;
  folder: FolderModelType["id"];
  files: Array<FileModelType["id"]>;
}

export type FoldersFilesCollectionType = Array<FolderModelType | FileModelType>;