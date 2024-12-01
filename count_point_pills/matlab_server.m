function startMATLABSocketServer()
    % Crear un servidor de socket en el puerto 8000 utilizando Java
    serverSocket = java.net.ServerSocket(8000);
    disp('Servidor de socket MATLAB escuchando en el puerto 8000...');

    while true
        % Esperar una conexión del cliente
        clientSocket = serverSocket.accept();
        disp('Cliente conectado. Esperando datos...');

        % Crear un flujo de entrada para leer datos del cliente
        inputStream = clientSocket.getInputStream();
        dataInputStream = java.io.DataInputStream(inputStream);

        % Leer datos del cliente
        dataBuffer = []; % Inicializar el buffer de datos
        while dataInputStream.available() > 0
            dataBuffer = [dataBuffer; dataInputStream.readByte()]; %#ok<AGROW>
        end
        dataStr = char(typecast(dataBuffer, 'uint8')');
        inputData = jsondecode(dataStr);
        disp('Received input from frontend:');
        disp(inputData);

        % Decodificar la imagen base64
        imageData = matlab.net.base64decode(inputData.pills);
        imageMatrix = imdecode(imageData, 'jpg'); % Cambiar 'jpg' según el formato de la imagen

        % Leer los parámetros enviados desde el frontend
        point_long = inputData.num_long; % Número de pastillas alargadas a destacar
        point_round = inputData.num_round; % Número de pastillas redondas a destacar

        % Procesar la imagen para contar y clasificar las pastillas
        [numLong, numRound, indicesLong, indicesRound, stats] = processPills(imageMatrix);

        % Generar la respuesta de validación y destacar pastillas específicas
        highlightedImage = highlightPills(imageMatrix, point_round, point_long, indicesRound, indicesLong, stats);

        % Crear la respuesta en JSON
        outputData = struct();
        outputData.num_long_detected = numLong;
        outputData.num_round_detected = numRound;

        % Validación
        outputData.message = sprintf('Detected %d round pills and %d long pills.', numRound, numLong);
        disp(outputData.message);

        % Guardar imagen destacada como archivo temporal para devolver
        outputImagePath = 'highlighted_pills.jpg';
        imwrite(highlightedImage, outputImagePath);

        % Adjuntar imagen procesada en la respuesta
        responseData = matlab.net.base64encode(fileread(outputImagePath));
        outputData.highlighted_image_base64 = responseData;

        % Enviar respuesta al cliente
        outputStr = jsonencode(outputData);
        outputBytes = int8(outputStr);

        % Crear un flujo de salida para enviar los datos al cliente
        outputStream = clientSocket.getOutputStream();
        dataOutputStream = java.io.DataOutputStream(outputStream);
        dataOutputStream.write(outputBytes, 0, length(outputBytes));
        dataOutputStream.flush();

        % Cerrar la conexión con el cliente
        clientSocket.close();
        disp('Cliente desconectado.');
    end
end

function [numLong, numRound, indicesLong, indicesRound, stats] = processPills(pills)
    % Convertir la imagen a escala de grises
    pills_g = rgb2gray(pills);

    % Umbralizar la imagen
    threshold = 160;
    pills_bin = pills_g > threshold;

    % Eliminar ruido mediante erosión
    SE2 = strel("disk", 15);
    pills_erode = imerode(pills_bin, SE2);

    % Etiquetar objetos
    [labeledImage, numObjects] = bwlabel(pills_erode);
    stats = regionprops(labeledImage, 'MajorAxisLength', 'MinorAxisLength', 'Eccentricity', 'Centroid', 'BoundingBox');

    % Inicializar contadores
    numLong = 0;
    numRound = 0;
    indicesLong = [];
    indicesRound = [];

    % Clasificar objetos
    for k = 1:numObjects
        aspectRatio = stats(k).MajorAxisLength / stats(k).MinorAxisLength;
        eccentricity = stats(k).Eccentricity;

        if eccentricity > 0.7
            numLong = numLong + 1;
            indicesLong = [indicesLong, k];
        else
            numRound = numRound + 1;
            indicesRound = [indicesRound, k];
        end
    end
end

function highlightedImage = highlightPills(image, point_round, point_long, indicesRound, indicesLong, stats)
    highlightedImage = image;
    figure, imshow(highlightedImage), hold on;

    % Destacar pastillas redondas
    if numel(indicesRound) < point_round
        disp(['Error: ', num2str(point_round), ' round pills are required, but only ', num2str(numel(indicesRound)), ' were found.']);
    else
        for i = 1:point_round
            rectangle('Position', stats(indicesRound(i)).BoundingBox, 'EdgeColor', 'blue', 'LineWidth', 2);
        end
    end

    % Destacar pastillas alargadas
    if numel(indicesLong) < point_long
        disp(['Error: ', num2str(point_long), ' long pills are required, but only ', num2str(numel(indicesLong)), ' were found.']);
    else
        for i = 1:point_long
            rectangle('Position', stats(indicesLong(i)).BoundingBox, 'EdgeColor', 'red', 'LineWidth', 2);
        end
    end

    hold off;
    frame = getframe(gca);
    highlightedImage = frame.cdata; % Convertir figura a imagen
    close;
end

% Iniciar el servidor
startMATLABSocketServer();
