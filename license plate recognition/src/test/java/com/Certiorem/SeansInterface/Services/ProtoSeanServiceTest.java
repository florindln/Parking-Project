package com.Certiorem.SeansInterface.Services;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.LongToIntFunction;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class ProtoSeanServiceTest {

    @Autowired
    private ProtoSeanService protoSeanService;

    @MockBean
    private ProtoSeanRepo protoSeanRepo;

    @Test
    void submitProtoSeanToDb() {
        ProtoSean protoSean = new ProtoSean(1L,"123KLM","Batshal",
                "065489654","email@email.com",0,
                0,0,1, new Date());
        protoSeanService.submitProtoSeanToDb(protoSean);
        verify(protoSeanRepo,times(1)).save(protoSean);
    }

    @Test
    void getAllRecordsFromDb() {
        ProtoSean protoSean = new ProtoSean(1L,"123KLM","Batshal",
                "065489654","email@email.com",0,
                0,0,1, new Date());
        ProtoSean protoSean1 = new ProtoSean(2L,"123HLM","Florin",
                "0654845654","florin@email.com",0,
                0,0,1, new Date());
        List<ProtoSean> protoSeanList = new ArrayList<ProtoSean>();
        protoSeanList.add(protoSean);
        protoSeanList.add(protoSean1);

        when(protoSeanRepo.findAll()).thenReturn(protoSeanList);
        assertEquals(2,protoSeanService.getAllRecordsFromDb().size());
    }

    @Test
    void deleteRecordsById() {
        ProtoSean protoSean = new ProtoSean(2L,"123HLM","Florin",
                "0654845654","florin@email.com",0,
                0,0,1, new Date());
        protoSeanService.deleteRecordsById(protoSean.getId());
        verify(protoSeanRepo,times(1)).deleteById(protoSean.getId());
    }

    @Test
    void retrieveRecordsByRecordId() {
        Long id = 1L;
        ProtoSean protoSean = new ProtoSean(1L,"123HLM","Florin",
                "0654845654","florin@email.com",0,
                0,0,1, new Date());
        when(protoSeanRepo.findById(id)).thenReturn(Optional.of(protoSean));
        assertEquals(protoSean, protoSeanService.retrieveRecordsByRecordId(id));

    }
}