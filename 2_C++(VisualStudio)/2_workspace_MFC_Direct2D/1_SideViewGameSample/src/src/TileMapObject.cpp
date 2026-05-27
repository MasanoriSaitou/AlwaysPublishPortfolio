#include "pch.h"
#include "include/TileMapObject.h"

TileMapObject::TileMapObject() {

	isDisappearance = false;
}

TileType TileMapObject::GetTileType(){

	return TileType::Empty;
}

void TileMapObject::Draw(Renderer& renderer,int x,int y,float offsetY,const Camera& cameraX){
}

void TileMapObject::OnHit(){
}

bool TileMapObject::IsDisappearance() const {

	return isDisappearance;
}