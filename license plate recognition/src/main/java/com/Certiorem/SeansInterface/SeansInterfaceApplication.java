package com.Certiorem.SeansInterface;

import com.Certiorem.SeansInterface.LicenseRecognition.CsvReader;
import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.github.sarxos.webcam.Webcam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.util.List;

//@EnableScheduling
@SpringBootApplication
@ComponentScan({"com"})
public class SeansInterfaceApplication implements CommandLineRunner {

	@Autowired
	private JdbcTemplate jdbcTemplate;

//	@Autowired
//	private EmailSenderService emailSenderService;

	public static void main(String[] args) {

		SpringApplication.run(SeansInterfaceApplication.class, args);

		System.err.println("something");

//		boolean[] parkingSpaces= CsvReader.parseCsv();
//		System.err.println("sth");
//		Webcam webcam = Webcam.getDefault();
//		webcam.open();
//		try {
//			String filePath="../CertioremSean/SeansInterface/src/main/resources/picsFromStream/snapshot1.png";
//			ImageIO.write(webcam.getImage(), "PNG", new File(filePath));
//			System.err.println("webcam snapshot taken");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}


//		MessageInterface messageInterface=new SmsMessage();
//		messageInterface.sendMessage("1234","sometime","soon");


//		Scanner s=new Scanner(System.in);
//		System.out.println("Enter the path of mp4 (for eg c:\\test.mp4)");
//		String mp4Path=s.nextLine();
//		System.out.println("Enter the folder path where the images will be saved (eg c:\\convertedImages)");
//		String imagePath=s.nextLine();




//		Intelligence intelligence = null;
//		try {
//			intelligence = new Intelligence();
//			String path="..\\CertioremSean\\SeansInterface\\src\\main\\resources\\pics\\chosenAgain.jpg";
//			CarSnapshot carSnapshot=new CarSnapshot(path);
//			String smth=intelligence.recognize(carSnapshot);
//			System.err.println(smth);
//		} catch (ParserConfigurationException e) {
//			e.printStackTrace();
//		} catch (SAXException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

	}

	@Override
	public void run(String... args) throws Exception{
		String sql = "SELECT * FROM parking_info";

		List<ProtoSean> visitors = jdbcTemplate.query(sql,
				BeanPropertyRowMapper.newInstance(ProtoSean.class));
		visitors.forEach(System.out :: println);
	}

//	@EventListener(ApplicationReadyEvent.class)
//	public void triggerMail(){
//		emailSenderService.sendEmail("cankonedelchev@gmail.com",
//										  "Email was sent properly.",
//									    "A visitor has arrived");
//	}

}
