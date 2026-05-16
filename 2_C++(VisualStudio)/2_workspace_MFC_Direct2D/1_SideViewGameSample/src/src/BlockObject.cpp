#include "pch.h"
#include "include/BlockObject.h"
#include "GameLibrary/GameLibrary.h"
using namespace Library;

TileType BlockObject::GetTileType() {

    return TileType::Ground;
}

void BlockObject::Draw(Renderer& renderer, int x, int y,float offsetY,float cameraX){

    GameLibrary::DrawBlock(renderer, x, y, offsetY,cameraX, TILE_SIZE, ColorF::Brown);
}