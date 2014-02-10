package controllers;

import org.apache.commons.compress.utils.IOUtils;
import play.Logger;
import play.Play;
import play.data.FileUpload;
import play.data.parsing.DataParser;
import play.mvc.Controller;

import javax.swing.text.Document;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


public class Upload extends Controller{


    public static void upload() {
        try {
            String fileName = params.get("file");
            String extraData = params.get("extradata");
            String publicPath = File.separator + "public/uploads" + File.separator + fileName + ".jpg";
            String fullTarget = new File(Play.getFile("").getAbsolutePath()) + publicPath;
            play.data.Upload upload;
            play.data.Upload theUpload;
            List<Object> uploadArgs = (List<Object>)request.args.get("__UPLOADS");
            if (uploadArgs != null && uploadArgs.size() > 0) {
                upload = (play.data.Upload)uploadArgs.get(0);
                if(upload.asFile() != null && upload.getContentType().startsWith("image/")) {
                    theUpload = upload;
                    FileInputStream input = new FileInputStream(upload.asFile());
                    FileOutputStream moveTo = new FileOutputStream(fullTarget);
                    IOUtils.copy(input, moveTo);
                }
            }
            renderJSON("{ 'filename': '" + publicPath + "'");
        }
        catch (Exception ex) {

        }
    }

                    /*
    public static void upload(String qqfile) {
        if (request.isNew) {

            FileOutputStream moveTo = null;

            Logger.info("Name of the file %s", qqfile);
            // Another way I used to grab the name of the file
            //String filename = request.headers.get("x-file-name").value();

            Logger.info("Absolute on where to send %s", Play.getFile("").getAbsolutePath() + File.separator + "uploads" + File.separator);
            try {

                InputStream data = request.body;


                moveTo = new FileOutputStream(new File(Play.getFile("").getAbsolutePath()) + File.separator + "uploads" + File.separator + "trosor.jpg");
                IOUtils.copy(data, moveTo);

            } catch (Exception ex) {

                // catch file exception
                // catch IO Exception later on
                renderJSON("{success: false}");
            }

        }

        renderJSON("{success: true}");
    }
             */
}
