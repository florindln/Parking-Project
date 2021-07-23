package com.Certiorem.SeansInterface.Repository;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProtoSeanRepo extends JpaRepository<ProtoSean, Long> {

    ProtoSean save(ProtoSean protoSean);
    ProtoSean findByNumberPlate(String numberPlate);
    List<ProtoSean> findAll();
}
