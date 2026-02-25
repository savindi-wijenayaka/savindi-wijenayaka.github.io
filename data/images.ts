export interface ImageAsset {
  src: string;
  alt: string;
}

export const ImageAssets: Record<string, ImageAsset> = {
  ProfilePhoto: {
    src: "/assets/brand/profile.jpg",
    alt: "Profile photo",
  },
};
