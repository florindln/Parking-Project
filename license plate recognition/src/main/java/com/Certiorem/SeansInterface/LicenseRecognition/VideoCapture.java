package com.Certiorem.SeansInterface.LicenseRecognition;

import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class VideoCapture {

    public static boolean convertMovieToJPG(String mp4Path, String imagePath, String imgType) throws Exception, IOException
    {
        Java2DFrameConverter converter = new Java2DFrameConverter();
        FFmpegFrameGrabber frameGrabber = new FFmpegFrameGrabber(mp4Path);
        frameGrabber.start();
        Frame frame;
        double frameRate=frameGrabber.getFrameRate();
        int imgNum=0;
        System.out.println("Video has "+frameGrabber.getLengthInFrames()+" frames and has frame rate of "+frameRate);
        try {
            for(int ii=1;ii<=frameGrabber.getLengthInFrames();ii++){
                imgNum++;
                frameGrabber.setFrameNumber(ii);
                frame = frameGrabber.grab();
                BufferedImage bi = converter.convert(frame);
                String path = imagePath+ File.separator+imgNum+".jpg";
                ImageIO.write(bi,imgType, new File(path));
                //frameJump is an int argument in the method parameters
               // ii+=frameJump;   instead of setting this manually we will jump every second
                ii+=(int)frameRate;
            }
            System.out.println("successfully finished");
            frameGrabber.stop();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
