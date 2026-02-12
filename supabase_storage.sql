CREATE POLICY "Allow anon file upload"
ON storage.objects
FOR INSERT
WITH CHECK (auth.role() = 'anon')
