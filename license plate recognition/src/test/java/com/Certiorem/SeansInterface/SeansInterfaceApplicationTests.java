package com.Certiorem.SeansInterface;

import com.Certiorem.SeansInterface.Model.ProtoSean;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;

@SpringBootTest
class SeansInterfaceApplicationTests {

	@Test
	public void constructorShouldSetFieldCorrectly() {
	//arrange
		ProtoSean protoSean = new ProtoSean(1L,"123KLM","Batshal",
				"065489654","email@email.com",0,
				0,1,1, new Date());
        //act
		Long id = protoSean.getId();
		String numberPlate = protoSean.getNumberPlate();
		String visitor = protoSean.getVisitor();
		String phnNumber = protoSean.getPhnNumber();
		String hostEmail = protoSean.getHostEmail();
		int arrived = protoSean.getArrived();
		int hostNotified = protoSean.getHostNotified();
		int secretaryNotified = protoSean.getSecretaryNotified();
		int hasWhatsApp = protoSean.getHasWhatsApp();
		Date expectedAt = protoSean.getExpectedAt();
        //assert
		assertEquals(1L,id);
		assertEquals("123KLM", numberPlate);
		assertEquals("Batshal", visitor);
		assertEquals("065489654", phnNumber);
		assertEquals("email@email.com", hostEmail);
		assertEquals(0, arrived);
		assertEquals(0, hostNotified);
		assertEquals(1, secretaryNotified);
		assertEquals(1, hasWhatsApp);
//		assertEquals(new Date(), expectedAt);

	}

}
