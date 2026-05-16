#pragma once
#include "include/Renderer.h"
#include <optional>
using namespace D2D1;
using namespace std;

namespace Library {

	class GameLibrary {

	public:

		struct StickManInfo {

			float headRadius = 0.0f;
			float bodyLength = 0.0f;
			float limbLength = 0.0f;
			float lineWidth = 0.0f;
			ColorF colorHead = ColorF::White;
			ColorF colorTorso = ColorF::White;
			ColorF colorLeftHand = ColorF::White;
			ColorF colorRightHand = ColorF::White;
			ColorF colorLeftLeg = ColorF::White;
			ColorF colorRightLeg = ColorF::White;
		};
		static void DrawBlock(Renderer& renderer, int x, int y, float offsetY, float cameraX, int TILE_SIZE, optional<ColorF> colorFront, optional<ColorF> colorTop = nullopt, optional<ColorF> colorSide = nullopt);
		static void DrawStickMan(const StickManInfo& info, Renderer& renderer, float x, float y);
		static float GetStickManWidth(const StickManInfo& info);
		static float GetStickManHeight(const StickManInfo& info);
	};
}