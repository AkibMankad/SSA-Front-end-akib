import '@testing-library/jest-dom/vitest';

if (!window.matchMedia) {
	window.matchMedia = function matchMedia(query) {
		return {
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		};
	};
}

if (!global.ResizeObserver) {
	global.ResizeObserver = class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
}
