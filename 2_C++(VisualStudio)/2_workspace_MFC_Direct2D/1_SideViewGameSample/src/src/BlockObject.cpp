#include "pch.h"
#include "include/BlockObject.h"
#include "GameLibrary/GameLibrary.h"
using namespace Library;

TileType BlockObject::GetTileType() {

    return TileType::Ground;
}

void BlockObject::Draw(Renderer& renderer, int x, int y,float offsetY, const Camera& camera){

    GameLibrary::DrawBlock(renderer, x, y, offsetY,camera, TILE_SIZE, ColorF::Brown);
}