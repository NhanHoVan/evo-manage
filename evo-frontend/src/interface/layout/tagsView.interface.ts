export type TagItem = {
  code: string;
  label: {
    en_US: string;
    vi_VN: string;
  };
  path: string;
  closable: boolean;
};

export interface TagState {
  tags: TagItem[];
  activeTagId: TagItem['path'];
}
