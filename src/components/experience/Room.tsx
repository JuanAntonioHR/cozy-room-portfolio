"use client";

import { memo } from "react";
import Foliage, { FoliageInstance } from "./Foliage";
import { VoxelChuModel } from "./gltfjsx/VoxelChuModel";
import { VoxelGBModel } from "./gltfjsx/VoxelGBModel";
import { Voxel3dsModel } from "./gltfjsx/Voxel3dsModel";
import { VoxelSWModel } from "./gltfjsx/VoxelSWModel";
import { SWDockModel } from "./gltfjsx/SWDockModel";
import { VideoScreen } from "./VideoScreen";
import { RoomModel } from "./gltfjsx/RoomModel";

const FOLIAGE_INSTANCES: FoliageInstance[] = [
  { type: 3, position: [-1.21, 0.74, 1.04], scale: 0.2 },
  { type: 2, position: [-1.23, 0.75, 0.9], scale: 0.2 },

  { type: 0, position: [-1.2, 0.14, 0.91], scale: 0.25 },
  // Bookshelf
  { type: 2, position: [-0.8, 1.08, -1.15], scale: 0.3 },
  { type: 2, position: [0.22, 1.08, -1.15], scale: 0.3 },

  { type: 0, position: [-1, 0.41, -1.15], scale: 0.3 },
  { type: 3, position: [-0.24, 0.4, -1.14], scale: 0.25 },
  { type: 3, position: [0.25, 0.4, -1.14], scale: 0.25 },
  { type: 0, position: [0.72, 0.4, -1.15], scale: 0.3 },
  { type: 0, position: [0.96, 0.4, -1.15], scale: 0.25 },

  { type: 2, position: [0.18, -0.53, -1.15], scale: 0.25 },
  // Floor
  { type: 1, position: [-1.1, -0.8, 1.19] },
  { type: 1, position: [1.4, -0.8, -1.18] },
];

function Room() {
  return (
    <group onClick={(e) => e.stopPropagation()}>
      <RoomModel />
      <Foliage instances={FOLIAGE_INSTANCES} />
      <VoxelChuModel />
      <VoxelGBModel />
      <Voxel3dsModel />
      <VoxelSWModel />
      <SWDockModel />
      <VideoScreen />
    </group>
  );
}

export default memo(Room);
