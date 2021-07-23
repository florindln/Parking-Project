package com.Certiorem.SeansInterface.LicenseRecognition;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.FileImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;

public class FoscamWebcam implements MyWebcam {

    float quality = 0.5f;

    @Override
    public boolean snapPicture(int snapshotCounter) {
        try {
            URL url = new URL("http://192.168.0.140:88/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=root&pwd=Password1234");
            String filePath = FilePath.snapshotPath + snapshotCounter + ".jpg";
            BufferedImage image = ImageIO.read(url);
            //coordinates to reduce image size for license plate input
                int height=image.getHeight();
                int width=image.getWidth();
                //numbers to reduce width from 1280 to 600 and height from 720 to 500ish
                int targetWidth = (int)(width / 2.13);
                int targetHeight = (int)(height /1.44);
                 // Coordinates of the image's middle
             int xc = (width - targetWidth) / 2;
                int yc = (height - targetHeight) / 2;
            // Crop
            BufferedImage croppedImage = image.getSubimage(
                    xc,
                    yc,
                    targetWidth, // widht
                    targetHeight // height
            );

            //in case we want to compress the image
            JPEGImageWriteParam jpegParams = new JPEGImageWriteParam(null);
            jpegParams.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            jpegParams.setCompressionQuality(quality);
            final ImageWriter writer = ImageIO.getImageWritersByFormatName("jpg").next();
            // specifies where the jpg image has to be written
            writer.setOutput(new FileImageOutputStream(
                    new File(filePath)));
            // writes the file with given compression level
            // from your JPEGImageWriteParam instance
            writer.write(null, new IIOImage(croppedImage, null, null), jpegParams);
            writer.dispose();

//            ImageIO.write(croppedImage, "jpg", new File(filePath));
            System.err.println("IP foscam snapshot " + snapshotCounter + " taken");
            return true;
        }
        catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
