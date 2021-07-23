package com.Certiorem.SeansInterface.LicenseRecognition;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CsvReader {




    private static List<List<String>> readCsv() {
        List<List<String>> records = new ArrayList<>();
        try (
                BufferedReader br = new BufferedReader(new FileReader(FilePath.csvPath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                records.add(Arrays.asList(values));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return records;
    }

    public static boolean[] parseCsv(){
        List<List<String>> records= readCsv();
        boolean[] spots=new boolean[records.size()];
        boolean notOk=true;
        for(List<String> value:records){
            if(notOk) {
                notOk=false;
                continue;
            }
            if(value.get(1).equals("yes")) {
                spots[Integer.parseInt(value.get(0))] =true;
            }
        }
        return spots;
    }
}
