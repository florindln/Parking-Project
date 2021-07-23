package com.Certiorem.SeansInterface.LicenseRecognition;

import com.github.sarxos.webcam.Webcam;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;

public class LaptopWebcam implements MyWebcam {

    Webcam webcam = Webcam.getDefault();

    @Override
    public boolean snapPicture(int snapshotCounter) {
        webcam.open();
            try {
                String filePath = FilePath.snapshotPath + snapshotCounter + ".jpg";
                ImageIO.write(webcam.getImage(), "jpg", new File(filePath));
                System.err.println("webcam snapshot " + snapshotCounter + " taken");
//                snapshotCounter++;
                return true;

            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
    }
}
