enum ImageFormat {
	JPEG = 'jpeg',
	PNG = 'png',
}

interface IImageResolution {
	width: number;
	height: number;
}

interface IImageConversion extends IImageResolution {
	format: ImageFormat;
}

class ImageBuilder {
	private formats: Set<ImageFormat> = new Set();
	private resolutions: Set<IImageResolution> = new Set();

	addPng(): this {
		this.formats.add(ImageFormat.PNG);
		return this;
	}

	addJpeg(): this {
		this.formats.add(ImageFormat.JPEG);
		return this;
	}

	addResolution(width: number, height: number): this {
		this.resolutions.add({ width, height });
		return this;
	}

	build(): IImageConversion[] {
		const results: IImageConversion[] = Array.from(this.formats).reduce((acc: IImageConversion[], format) => {
			Array.from(this.resolutions).forEach(({ width, height }) => acc.push({ width, height, format }));

			return acc;
		}, []);
		return results;
	}
}

const imagesConversions = new ImageBuilder()
	.addJpeg()
	.addPng()
	.addResolution(200, 200)
	.addResolution(300, 200)
	.addResolution(1080, 720)
	.build();

console.log(imagesConversions);
