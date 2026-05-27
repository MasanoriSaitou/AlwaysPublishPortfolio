#include "pch.h"
#include "include/ThornBlockObject.h"
#include "GameLibrary/GameLibrary.h"
using namespace Library;

TileType ThornBlockObject::GetTileType() {

    return TileType::Thorn;
}

void ThornBlockObject::Draw(Renderer& renderer, int x, int y, float offsetY, const Camera& camera) {

    GameLibrary::DrawTriangleTile(renderer, x, y, 2, camera,TILE_SIZE ,ColorF::Gray, 0);
}