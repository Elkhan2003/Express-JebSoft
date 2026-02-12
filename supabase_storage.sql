CREATE POLICY "Allow anon file upload"
ON storage.objects
FOR INSERT
WITH CHECK (auth.role() = 'anon')

-- 1. Разрешить ЗАГРУЗКУ (INSERT) для всех (анонимов и авторизованных)
CREATE POLICY "Allow public upload" ON storage.objects FOR INSERT 
TO anon, authenticated 
WITH CHECK (bucket_id = 'avatar');

-- 2. Разрешить ПРОСМОТР (SELECT) для всех
CREATE POLICY "Allow public select" ON storage.objects FOR SELECT 
TO anon, authenticated 
USING (bucket_id = 'avatar');