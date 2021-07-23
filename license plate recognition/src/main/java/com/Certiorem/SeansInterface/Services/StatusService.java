package com.Certiorem.SeansInterface.Services;

import com.Certiorem.SeansInterface.Model.ProtoSean;
import com.Certiorem.SeansInterface.Repository.ProtoSeanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StatusService {

    @Autowired
    ProtoSeanRepo protoSeanRepo;




    public List<ProtoSean> getUnnotifiedAppointments(){
        List<ProtoSean> appointments = protoSeanRepo.findAll();
        List<ProtoSean> unnotifiedAppointments = new List<ProtoSean>() {
            @Override
            public int size() {
                return 0;
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public boolean contains(Object o) {
                return false;
            }

            @Override
            public Iterator<ProtoSean> iterator() {
                return null;
            }

            @Override
            public Object[] toArray() {
                return new Object[0];
            }

            @Override
            public <T> T[] toArray(T[] a) {
                return null;
            }

            @Override
            public boolean add(ProtoSean protoSean) {
                return false;
            }

            @Override
            public boolean remove(Object o) {
                return false;
            }

            @Override
            public boolean containsAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean addAll(Collection<? extends ProtoSean> c) {
                return false;
            }

            @Override
            public boolean addAll(int index, Collection<? extends ProtoSean> c) {
                return false;
            }

            @Override
            public boolean removeAll(Collection<?> c) {
                return false;
            }

            @Override
            public boolean retainAll(Collection<?> c) {
                return false;
            }

            @Override
            public void clear() {

            }

            @Override
            public ProtoSean get(int index) {
                return null;
            }

            @Override
            public ProtoSean set(int index, ProtoSean element) {
                return null;
            }

            @Override
            public void add(int index, ProtoSean element) {

            }

            @Override
            public ProtoSean remove(int index) {
                return null;
            }

            @Override
            public int indexOf(Object o) {
                return 0;
            }

            @Override
            public int lastIndexOf(Object o) {
                return 0;
            }

            @Override
            public ListIterator<ProtoSean> listIterator() {
                return null;
            }

            @Override
            public ListIterator<ProtoSean> listIterator(int index) {
                return null;
            }

            @Override
            public List<ProtoSean> subList(int fromIndex, int toIndex) {
                return null;
            }
        };
        appointments.forEach(protoSean -> {
            if(protoSean.getArrived() == 1 && protoSean.getSecretaryNotified() != 1){
                unnotifiedAppointments.add(protoSean);
                protoSean.setSecretaryNotified(1);
                protoSeanRepo.save(protoSean);
                System.err.println(protoSean);
            }
        });

        return unnotifiedAppointments;
    }
}
