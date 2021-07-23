package com.Certiorem.SeansInterface;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import com.Certiorem.SeansInterface.Services.ProtoSeanService;
import net.sf.javaanpr.configurator.Configurator;
import net.sf.javaanpr.gui.ReportGenerator;
import net.sf.javaanpr.imageanalysis.CarSnapshot;
import net.sf.javaanpr.imageanalysis.Photo;
import net.sf.javaanpr.intelligence.Intelligence;
import net.sf.javaanpr.intelligence.RecognizedPlate;
import net.sf.javaanpr.recognizer.RecognizedChar;
import net.sf.javaanpr.recognizer.RecognizedPattern;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class LicensePlateIntegrationTests {

    @MockBean
    private ProtoSeanRepo protoSeanRepo;

    Intelligence intelligence;


    @Test
    public void inputPlateTest() throws Exception {
        InputStream fstream = Configurator.getConfigurator().getResourceAsStream("snapshots/test_041.jpg");
        assertNotNull(fstream);
        Photo photo = new Photo(fstream);
        fstream.close();

        assertNotNull(photo);
        assertNotNull(photo.getImage());
    }

    @Test
    public void recognizePlateTest() throws IOException, ParserConfigurationException, SAXException {
        intelligence=new Intelligence();
        String filePath="dataset/2.jpg";
        CarSnapshot carSnapshot=new CarSnapshot(filePath);
        String plate=intelligence.recognize(carSnapshot);
        assertEquals(plate,"4VXN7");
    }

    @Test
    public void getUserFromRecognizedPlate(){
        String plate = "123HLM";
        ProtoSean protoSean = new ProtoSean(1L,"123HLM","Florin",
                "0654845654","florin@email.com",0,
                0,0,1, new Date());
        when(protoSeanRepo.findByNumberPlate(plate)).thenReturn(protoSean);
        Assertions.assertEquals(protoSean, protoSeanRepo.findByNumberPlate(plate));
    }

    @Test
    public void testInsertImageBadInput() throws IllegalArgumentException, IOException {
        try {
             ReportGenerator reportGenerator = new ReportGenerator("target/test-classes/");
             int w = 1;
             CarSnapshot carSnapshot = new CarSnapshot("snapshots/test_00.jpg");
             BufferedImage image = carSnapshot.renderGraph();
             String cls = "test";
             int h = 1;
            reportGenerator.insertImage(image, cls, w, h);
        } catch ( Exception e) {
            assertEquals("input == null!", e.getMessage());
        }
    }

    private RecognizedPlate getRecognizedPlateWithThreeRecognizedChars() {
        RecognizedPlate recognizedPlate = new RecognizedPlate();
        RecognizedChar recognizedChar1 = new RecognizedChar();
        recognizedChar1.addPattern(new RecognizedPattern('A', 1.0f));
        recognizedChar1.sort(false);
        RecognizedChar recognizedChar2 = new RecognizedChar();
        recognizedChar2.addPattern(new RecognizedPattern('B', 2.0f));
        recognizedChar2.addPattern(new RecognizedPattern('C', 3.0f));
        recognizedChar2.sort(false);
        RecognizedChar recognizedChar3 = new RecognizedChar();
        recognizedChar3.addPattern(new RecognizedPattern('D', 4.0f));
        recognizedChar3.sort(false);
        recognizedPlate.addChar(recognizedChar1);
        recognizedPlate.addChar(recognizedChar2);
        recognizedPlate.addChar(recognizedChar3);
        return recognizedPlate;
    }

    @Test
    public void testCanAddAndGetChars() {
        RecognizedPlate recognizedPlate = getRecognizedPlateWithThreeRecognizedChars();
        assertEquals(recognizedPlate.getChar(0).getPattern(0).getChar(), 'A');
        assertEquals(recognizedPlate.getChar(1).getPattern(0).getChar(), 'B');
        assertEquals(recognizedPlate.getChar(1).getPattern(1).getChar(), 'C');
        assertEquals(recognizedPlate.getChar(2).getPattern(0).getChar(), 'D');
    }

    @Test
    public void testCanAddAndGetAllChars() {
        RecognizedPlate recognizedPlate = getRecognizedPlateWithThreeRecognizedChars();
        List<RecognizedChar> recognizedChars = recognizedPlate.getChars();
        assertEquals(recognizedChars.get(0).getPattern(0).getChar(), 'A');
        assertEquals(recognizedChars.get(1).getPattern(0).getChar(), 'B');
        assertEquals(recognizedChars.get(1).getPattern(1).getChar(), 'C');
        assertEquals(recognizedChars.get(2).getPattern(0).getChar(), 'D');
    }
}
