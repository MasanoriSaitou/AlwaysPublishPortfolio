#include "pch.h"
#include "include/PowerUpBlock1Object.h"
#include "GameLibrary/GameLibrary.h"
using namespace Library;

TileType PowerUpBlock1Object::GetTileType() {

    return TileType::PowerUp1;
}

void PowerUpBlock1Object::OnHit() {

    isDisappearance = true;
}

void PowerUpBlock1Object::Draw(Renderer& renderer, int x, int y, float offsetY, const Camera& camera) {

    GameLibrary::DrawBlock(renderer,x,y,offsetY,camera,TILE_SIZE,ColorF::Red);
}